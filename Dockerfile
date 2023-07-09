FROM eclipse-temurin:17-jdk as build

ADD . /src

RUN cd /src && ./gradlew clean build


FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /src/build/libs/*.jar /app/productavailability.jar
COPY entrypoint.sh /app/

RUN  chmod +x /app/entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:80/healthz || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]