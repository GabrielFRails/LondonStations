FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["bash", "-c", "python -c 'print(\"Olá, Mundo!\")'; tail -f /dev/null"]
