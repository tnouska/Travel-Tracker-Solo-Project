CREATE TABLE "person"
(
    "id" serial PRIMARY KEY,
    "username" varchar(80) NOT NULL UNIQUE,
    "password" varchar(1000) NOT NULL,
);

CREATE TABLE "track"
(
    "id" serial NOT NULL PRIMARY KEY,
    "person_id" INT REFERENCES "person",
    "name" varchar(200),
    "date" VARCHAR(200),
);

CREATE TABLE "waypoint"
(
    "id" serial NOT NULL PRIMARY KEY,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "description" varchar(1000),
    "img_url" varchar(1000),
    "elevation" DECIMAL,
    "time" VARCHAR(200),
    "track_id" INT REFERENCES "track",
);

CREATE TABLE "trackpoint"
(
    "id" serial NOT NULL PRIMARY KEY,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "elevation" DECIMAL,
    "time" VARCHAR(200) NOT NULL,
    "track_id" INT REFERENCES "track",
);
