FROM python:3.10-slim
ARG PORT
ENV PORT=$PORT
WORKDIR /app
RUN pip install pdm
COPY pyproject.toml .
RUN pdm install
COPY . .
CMD [ "pdm", "run", "python", "-m", "app" ]