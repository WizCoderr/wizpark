from ultralytics import YOLO
import cv2
from sort.sort import *
from util import get_car, read_license_plate, write_csv
import random
from add_missing_data import interpolate_box, generating_updated_file
from visualize import LicensePlateDetector


"""Takes sample video as data.

Returns: mp4 including processed license plates, data extracted csv."""


VIDEO_DATASET = "tests\sample.mp4"

results = {}

mot_tracker = Sort()

# Loading Models
coco_model = YOLO('yolov8n.pt')
license_plate_detector = YOLO('license_plate_detector.pt')

# Loading sample video
cap = cv2.VideoCapture(VIDEO_DATASET)

vehicles = [2, 3, 5, 7] # These numbers represent the index of things we are using eg. car, motocycles, trucks in the COCO Dataset used in this project

# Reading Frames
frame_nmr = -1
ret = True
while ret:
    frame_nmr += 1
    ret, frame = cap.read()

    # All frames processed here
    if ret and frame_nmr:
        results[frame_nmr] = {}
        # Detecting Vehicles
        detections = coco_model(frame)[0]
        detections_ = []
        for detection in detections.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = detection
            if int(class_id) in vehicles:
                detections_.append([x1, y1, x2, y2, score])

        # Tracking vehicles
        track_ids = mot_tracker.update(np.asarray(detections_))

        # License pate detection
        license_plates = license_plate_detector(frame)[0]
        for license_plate in license_plates.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = license_plate

            # Assigning lic_plate to cars
            xcar1, ycar1, xcar2, ycar2, car_id = get_car(license_plate, track_ids)

            if car_id != -1:

                # Cropping license plate
                license_plate_crop = frame[int(y1):int(y2), int(x1): int(x2), :]

                # Lic_plate preprocessing
                license_plate_crop_gray = cv2.cvtColor(license_plate_crop, cv2.COLOR_BGR2GRAY)
                _, license_plate_crop_thresh = cv2.threshold(license_plate_crop_gray, 64, 255, cv2.THRESH_BINARY_INV)

                # Reading plate number
                license_plate_text, license_plate_text_score = read_license_plate(license_plate_crop_thresh)

                if license_plate_text is not None:
                    results[frame_nmr][car_id] = {'car': {'bbox': [xcar1, ycar1, xcar2, ycar2]},
                                                  'license_plate': {'bbox': [x1, y1, x2, y2],
                                                                    'text': license_plate_text,
                                                                    'bbox_score': score,
                                                                    'text_score': license_plate_text_score}}

# Writing the results in csv
extracted_data = f'test{random.randint(1, 1000)}.csv'
write_csv(results, extracted_data)


extracted_data_path = f'{extracted_data}'
visualize_file = LicensePlateDetector(csv_path = extracted_data_path, video_path = VIDEO_DATASET)


visualize_file.load_license_plates()
visualize_file.process_video()


