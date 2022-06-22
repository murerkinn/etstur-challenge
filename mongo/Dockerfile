FROM mongo

WORKDIR .

COPY initiate-replicas.js ./docker-entrypoint-initdb.d/

CMD ["--replSet", "rs0", "--bind_ip_all"]
