FROM python:3.10-slim as builder
WORKDIR /build
COPY requirements.txt .
RUN python -m venv venv
RUN /build/venv/bin/pip install -r requirements.txt

FROM python:3.10-alpine
RUN adduser --disabled-password app
USER app
WORKDIR /app
COPY --from=builder /build/venv/ ./venv
COPY . .
