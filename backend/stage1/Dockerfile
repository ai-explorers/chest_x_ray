FROM python:3.7-slim
LABEL maintainer="Daniel Friedmann <docker@dfriemdann.de>"

RUN mkdir /app
WORKDIR /app
RUN mkdir ./model
COPY requirements.txt .
RUN pip3 install -r requirements.txt

RUN groupadd appgroup
RUN useradd -ms /bin/bash -d /app -G appgroup appuser 

USER appuser
COPY app.py .
COPY model/* model/

CMD gunicorn --bind 0.0.0.0:5000 app:app