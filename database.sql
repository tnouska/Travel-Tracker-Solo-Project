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
    "latitude" DECIMAL(20,10) NOT NULL,
    "longitude" DECIMAL(20,10) NOT NULL,
    "description" varchar(1000),
    "img_url" varchar(1000),
    "elevation" DECIMAL(20,10),
    "is_expanded" BOOLEAN DEFAULT 'false',
    "date" VARCHAR(200),
    "track_id" INT REFERENCES "track",
);

CREATE TABLE "trackpoint"
(
    "id" serial NOT NULL PRIMARY KEY,
    "latitude" DECIMAL(20,10) NOT NULL,
    "longitude" DECIMAL(20,10) NOT NULL,
    "elevation" DECIMAL(20,10),
    "date" VARCHAR(200) NOT NULL,
    "track_id" INT REFERENCES "track",
);