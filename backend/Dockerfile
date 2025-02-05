FROM python:3.11-alpine
LABEL maintainer="joanvasquez"

# Recommended to keep Python output unbuffered
ENV PYTHONUNBUFFERED=1

# Copy requirements and app code
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./app /app

WORKDIR /app
EXPOSE 8000

# Build argument to control dev installation
ARG DEV=false

# Create a virtual environment, install system dependencies,
# then install Python packages.
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache build-base && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
    /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del build-base && \
    adduser -D -H fastapi-user

ENV PATH="/py/bin:$PATH"

USER fastapi-user

# Use CMD to run FastAPI with Uvicorn on container start.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
