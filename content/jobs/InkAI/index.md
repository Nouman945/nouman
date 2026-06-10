---
date: '2024-10-01'
title: 'Founding AI Engineer'
company: 'Ink AI'
location: 'Delaware, USA'
range: 'June 2024 - Present'
url: 'https://ink.ai'
---

- Founding Engineer at **Ink AI**, a startup founded by **Rich Miner (Co-founder of Android)**. Designed the first stack from scratch: the **Android app (Kotlin)**, **Ktor/gRPC microservices**, **GCP infrastructure**, and the ML research direction.
- Designed and trained **generative handwriting synthesis models** from scratch: **Cursive Transformers** with cross-attention, encoder-decoder models with **MDN outputs**, GPT-2-style decoders with polar-coordinate stroke tokenization, and **VRNNs** on CASIA, IAM, and custom datasets grown to **1M+ samples**, with **200+ tracked experiments** in W&B.
- Shipped the V2 cursive transformer (trained on **650K samples**) as a production **FastAPI synthesis service** with KV-cache fp16 inference, coalesced GPU batching, and a Postgres result cache.
- Shipped production **LLM features**: fine-tuned **GPT models** for entity extraction and text prediction, **RAG-powered meeting briefs** with attendee enrichment, and **Gemini tool-calling agents** orchestrating Gmail, Calendar, and Docs APIs - backed by a prompt-management layer with model routing (OpenAI/Gemini) and an automated **prompt-eval harness**.
- Engineered training-data pipelines with **Gemini-based stroke alignment** and multi-engine character segmentation (Gemini, Google HWR, Apple Vision), and curated a proprietary dataset of **50,000+ samples from 450+ writers**.
- Architected multi-region **GCP infrastructure** (Cloud Run, Terraform, Cloud Build CI/CD) with a **RAG pipeline** using Vertex AI embeddings and PGVector, plus FAISS + ViT-L/14 image retrieval.
