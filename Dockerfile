FROM python:3.10-slim
WORKDIR /app
RUN pip install bottle
COPY . .