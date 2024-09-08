import ast
import cv2
import numpy as np
import pandas as pd

class LicensePlateDetector:
    def __init__(self, csv_path, video_path):
        """
        Initialize the LicensePlateDetector class.

        Args:
            csv_path (str): Path to the CSV file containing license plate information.
            video_path (str): Path to the video file.
        """
        self.csv_path = csv_path
        self.video_path = video_path
        self.results = pd.read_csv(self.csv_path)
        self.license_plate = {}
        self.cap = cv2.VideoCapture(self.video_path)
        self.fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)
        self.width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self.out = cv2.VideoWriter('./out.mp4', self.fourcc, self.fps, (self.width, self.height))

    def draw_border(self, img, top_left, bottom_right, color=(0, 255, 0), thickness=10, line_length_x=200, line_length_y=200):
        """
        Draw a border around a rectangle in the image.

        Args:
            img (numpy array): The input image.
            top_left (tuple): The top-left coordinates of the rectangle.
            bottom_right (tuple): The bottom-right coordinates of the rectangle.
            color (tuple, optional): The color of the border. Defaults to (0, 255, 0).
            thickness (int, optional): The thickness of the border. Defaults to 10.
            line_length_x (int, optional): The length of the border lines in the x-direction. Defaults to 200.
            line_length_y (int, optional): The length of the border lines in the y-direction. Defaults to 200.
        """
        x1, y1 = top_left
        x2, y2 = bottom_right

        cv2.line(img, (x1, y1), (x1, y1 + line_length_y), color, thickness)  #-- top-left
        cv2.line(img, (x1, y1), (x1 + line_length_x, y1), color, thickness)

        cv2.line(img, (x1, y2), (x1, y2 - line_length_y), color, thickness)  #-- bottom-left
        cv2.line(img, (x1, y2), (x1 + line_length_x, y2), color, thickness)

        cv2.line(img, (x2, y1), (x2 - line_length_x, y1), color, thickness)  #-- top-right
        cv2.line(img, (x2, y1), (x2, y1 + line_length_y), color, thickness)

        cv2.line(img, (x2, y2), (x2, y2 - line_length_y), color, thickness)  #-- bottom-right
        cv2.line(img, (x2, y2), (x2 - line_length_x, y2), color, thickness)

        return img

    def load_license_plates(self):
        """
        Load the license plates from the CSV file.
        """
        for car_id in np.unique(self.results['car_id']):
            max_ = np.amax(self.results[self.results['car_id'] == car_id]['license_number_score'])
            self.license_plate[car_id] = {'license_crop': None,
                                        'license_plate_number': self.results[(self.results['car_id'] == car_id) &
                                                                           (self.results['license_number_score'] == max_)]['license_number'].iloc[0]}
            self.cap.set(cv2.CAP_PROP_POS_FRAMES, self.results[(self.results['car_id'] == car_id) &
                                                                (self.results['license_number_score'] == max_)]['frame_nmr'].iloc[0])
            ret, frame = self.cap.read()

            x1, y1, x2, y2 = ast.literal_eval(self.results[(self.results['car_id'] == car_id) &
                                                        (self.results['license_number_score'] == max_)]['license_plate_bbox'].iloc[0].replace('[ ', '[').replace('   ', ' ').replace('  ', ' ').replace(' ', ','))

            license_crop = frame[int(y1):int(y2), int(x1):int(x2), :]
            license_crop = cv2.resize(license_crop, (int((x2 - x1) * 400 / (y2 - y1)), 400))

            self.license_plate[car_id]['license_crop'] = license_crop

    def process_video(self):
        """
        Process the video and draw the license plates.
        """
        frame_nmr = -1
        self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

        # read frames
        ret = True
        while ret:
            ret, frame = self.cap.read()
            frame_nmr += 1
            if ret:
                df_ = self.results[self.results['frame_nmr'] == frame_nmr]
                for row_indx in range(len(df_)):
                    # draw car
                    car_x1, car_y1, car_x2, car_y2 = ast.literal_eval(df_.iloc[row_indx]['car_bbox'].replace('[ ', '[').replace('   ', ' ').replace('  ', ' ').replace(' ', ','))
                    self.draw_border(frame, (int(car_x1), int(car_y1)), (int(car_x2), int(car_y2)), (0, 255, 0), 25,
                                    line_length_x=200, line_length_y=200)

                    # draw license plate
                    x1, y1, x2, y2 = ast.literal_eval(df_.iloc[row_indx]['license_plate_bbox'].replace('[ ', '[').replace('   ', ' ').replace('  ', ' ').replace(' ', ','))
                    cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 12)

                    # crop license plate
                    license_crop = self.license_plate[df_.iloc[row_indx]['car_id']]['license_crop']

                    H, W, _ = license_crop.shape

                    try:
                        frame[int(car_y1) - H - 100:int(car_y1) - 100,
                            int((car_x2 + car_x1 - W) / 2):int((car_x2 + car_x1 + W) / 2), :] = license_crop

                        frame[int(car_y1) - H - 400:int(car_y1) - H - 100,
                            int((car_x2 + car_x1 - W) / 2):int((car_x2 + car_x1 + W) / 2), :] = (255, 255, 255)

                        (text_width, text_height), _ = cv2.getTextSize(
                            self.license_plate[df_.iloc[row_indx]['car_id']]['license_plate_number'],
                            cv2.FONT_HERSHEY_SIMPLEX,
                            4.3,
                            17)

                        cv2.putText(frame,
                                    self.license_plate[df_.iloc[row_indx]['car_id']]['license_plate_number'],
                                    (int((car_x2 + car_x1 - text_width) / 2), int(car_y1 - H - 250 + (text_height / 2))),
                                    cv2.FONT_HERSHEY_SIMPLEX,
                                    4.3,
                                    (0, 0, 0),
                                    17)

                    except:
                        pass

                self.out.write(frame)
                frame = cv2.resize(frame, (1280, 720))

            self.out.release()
            self.cap.release()