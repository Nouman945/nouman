---
date: '2024-09-01'
title: 'Contract Computer Vision Engineer'
company: 'Ciena'
location: 'Remote, Canada'
range: 'Sep 2024 - Aug 2025'
url: 'https://www.ciena.com/'
---

- Built an end-to-end CV system to analyze network chassis images and detect chassis, cards, ports, and fiber anomalies; exposed as a Flask API with Redis-backed async batching and Basic Auth.
- Integrated Ultralytics YOLOv8 models for **chassis segmentation**, **multicard segmentation**, **port segmentation**, and **fiber kink/knot detection**, plus a **UNet ONNX** for fiber segmentation masks.
- Authored tooling to export `.pt` to ONNX and perform **dynamic/static INT8 quantization** via onnxruntime, reducing latency and memory while keeping a unified inference API.
- Designed a JSON-driven, **layout-aware interpolation** algorithm to map detections to expected card port grids and synthesize missing ports, improving robustness under occlusion/low confidence.
- Implemented detection and **bend-radius** estimation from centerlines; validated against ITU **G.652/G.657** standards and produced annotated overlays and structured outputs.
- Integrated **Llama 3.2 Vision** via local API for shelf/fiber label OCR with image overlays and JSON responses.
