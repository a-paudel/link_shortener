FROM python:3.10-slim
ARG PORT
ARG DATABASE_URL
ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL
WORKDIR /app
RUN pip install pdm
COPY pyproject.toml .
RUN pdm install
COPY . .
CMD [ "pdm", "run", "python", "-m", "app" ]