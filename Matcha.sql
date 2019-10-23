-- create table --
CREATE TABLE "users"
(
  "id_users" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "password" varchar,
  "email" varchar UNIQUE,
  "gender" varchar,
  "date_of_birth" varchar,
  "sexual_or" varchar DEFAULT 'B',
  "bio" varchar,
  "latitude" varchar DEFAULT '48.86667',
  "longitude" varchar DEFAULT '2.33333',
  "popular_score" int DEFAULT 100,
  "hash" varchar,
  "code" varchar,
  "phone_number" varchar UNIQUE,
  "is_verified" boolean DEFAULT '0',
  "is_verified_phone" boolean DEFAULT '0',
  "max_distance" int DEFAULT 30,
  "age_min" int DEFAULT 18,
  "age_max" int DEFAULT 30,
  "secretfa" varchar,
  "fa" boolean DEFAULT '0',
  "uid" varchar ,
  "tag_common" int DEFAULT 1,
  "sementics_bio" int DEFAULT 0,
  "picture" text ARRAY[5],
  "is_logged" boolean DEFAULT '0',
  "last_log" varchar,
  "qrcodefa" text
);

  CREATE TABLE "users_interest"
  (
    "id_users_interest" SERIAL PRIMARY KEY,
    "id_users" int,
    "id_interest" int
  );

  CREATE TABLE "like"
  (
    "id_like" SERIAL PRIMARY KEY,
    "id_users_like" int,
    "id_users_liked" int,
    "like" boolean
  );

  CREATE TABLE "visit"
  (
    "id_visit" SERIAL PRIMARY KEY,
    "id_users_visit" int,
    "id_users_visited" int
  );

  CREATE TABLE "interest"
  (
    "id_interest" SERIAL PRIMARY KEY,
    "name_interest" varchar
  );

  CREATE TABLE "match"
  (
    "id_match" SERIAL PRIMARY KEY,
    "mid" varchar,
    "id_like" int
  );

  CREATE TABLE "message"
  (
    "id_message" SERIAL PRIMARY KEY,
    "id_match" int,
    "id_users" int,
    "content" varchar,
    "date_message" timestamp
  );

  CREATE TABLE "facebook_users"
  (
    "id_users_fb" SERIAL PRIMARY KEY,
    "profil_id" numeric,
    "id_users" int
  );

  CREATE TABLE "google_users"
  (
    "id_users_google" SERIAL PRIMARY KEY,
    "profil_id" numeric,
    "id_users" int
  );

  CREATE TABLE "block"
  (
    "id_block" SERIAL PRIMARY KEY,
    "id_users_block" int,
    "id_users_blocked" int
  );

  CREATE TABLE "report"
  (
    "id_report" SERIAL PRIMARY KEY,
    "id_users_report" int,
    "view" boolean,
    "id_users_reported" int
  );

  CREATE TABLE "notification"
  (
    "id_notif" SERIAL PRIMARY KEY,
    "id_users" int,
    "notification" varchar
  );

  CREATE TABLE "history"
  (
    "id_history" SERIAL PRIMARY KEY,
    "id_users" int,
    "id_visited_users" int
  );

  CREATE TABLE "users_achievement"
  (
    "id_achievement_users" SERIAL PRIMARY KEY,
    "id_users" int,
    "id_achievement" int
  );

  CREATE TABLE "achievement"
  (
    "id_achievement" SERIAL PRIMARY KEY,
    "path" VARCHAR
  );

  -- functions --

  CREATE FUNCTION picture_remove(id_usr int, index int) RETURNS int AS $delete_picture_audit$
  DECLARE
result text[5];
arr text[5];
i INT;
  BEGIN
    arr :=
  (SELECT "picture"
  from "users"
  where "id_users" = id_usr);
  IF arr IS NULL OR index IS NULL THEN
  RETURN 0;
  END
  IF;
    FOR i IN array_lower
  (arr, 1)..array_upper
  (arr, 1) loop
  IF NOT i = index THEN
        result = array_append
  (result, arr[i]);
  END
  IF;
    END loop;
  UPDATE "users" SET "picture" = result WHERE "id_users" = id_usr;
  RETURN 1;
  END;
$delete_picture_audit$ LANGUAGE plpgsql;


  CREATE FUNCTION achievement_message(users int, match int, msg varchar, date_msg timestamp) RETURNS int AS $message_audit$
  DECLARE cnt int;
  BEGIN
    INSERT INTO message
      ("id_match", "id_users", "content", "date_message")
    VALUES(match, users, msg, date_msg);
    cnt :=
    (SELECT COUNT("id_users")
    FROM "message"
    WHERE "id_users" = id_users);
    IF (cnt = 500) THEN
    INSERT INTO "users_achievement"
      (id_users, "id_achievement")
    VALUES(id, '7');
    RETURN 1;
    ELSIF
    (cnt = 1000) THEN
    INSERT INTO "users_achievement"
      (id_users, "id_achievement")
    VALUES(id, '8');
    RETURN 2;
    ELSIF
    (cnt = 10000) THEN
    INSERT INTO "users_achievement"
      (id_users, "id_achievement")
    VALUES(id, '9');
    RETURN 3;
    ELSE
    RETURN 0;
  END
  IF;
  END;
$message_audit$ language plpgsql;

  CREATE FUNCTION achievement_match(id_like int, id_usr_like int, id_usr_liked int, mid varchar) RETURNS int[2] AS $match_audit$
  DECLARE cnt1 int;
  DECLARE cnt2 int;
  DECLARE ret int[2];
  BEGIN
      ret[1] = 0;
      ret[2] = 0;
  INSERT INTO match
    (id_like, mid)
  VALUES(id_like, mid);
  cnt1 :=
  (SELECT DISTINCT COUNT(id_match)
  FROM "match", "like"
  WHERE "like"."id_like" = "match"."id_like"
    AND ("like"."id_users_like" = id_usr_like
    OR "like"."id_users_liked" = id_usr_like)
                );
  cnt2 :=
  (SELECT DISTINCT COUNT(id_match)
  FROM "match", "like"
  WHERE "like"."id_like" = "match"."id_like"
    AND ("like"."id_users_like" = id_usr_liked
    OR "like"."id_users_liked" = id_usr_liked)
                );
  IF (cnt1 = 50) THEN
  INSERT INTO "users_achievement"
    (id_users, "id_achievement")
  VALUES(id, '4');
  ret[1] := 1;
  RETURN 1;
  ELSIF
  (cnt1 = 150) THEN
  INSERT INTO "users_achievement"
    (id_users, "id_achievement")
  VALUES(id, '5');
  ret[1] := 2;
        ELSIF
  (cnt1 = 1000) THEN
  INSERT INTO "users_achievement"
    (id_users, "id_achievement")
  VALUES(id, '6');
  ret[1] = 3;
        ELSIF
  (cnt2 = 50) THEN
  INSERT INTO "users_achievement"
    (id_users, "id_achievement")
  VALUES(id, '4');
  ret[2] := 1;
  RETURN 1;
  ELSIF
  (cnt2 = 150) THEN
  INSERT INTO "users_achievement"
    (id_users, "id_achievement")
  VALUES(id, '5');
  ret[2] := 2;
        ELSIF
  (cnt2 = 1000) THEN
  INSERT INTO "users_achievement"
    (id_users, "id_achievement")
  VALUES(id, '6');
  ret[2] = 3;
  END
  IF;
        return ret;
  END;
$match_audit$ language plpgsql;


  CREATE FUNCTION achievement_like(id_like int, id_liked int, "value" boolean) RETURNS int AS $like_audit$
  DECLARE cnt int;
  BEGIN
    INSERT INTO "like"
      ("id_users_like", "id_users_liked", "like")
    VALUES(id_like, id_liked, "value");
    cnt :=
    (SELECT COUNT("id_users_liked")
    FROM "like"
    WHERE "id_users_liked" = id_liked);
    IF (cnt = 50) THEN
    INSERT INTO "users_achievement"
      (id_liked, "id_achievement")
    VALUES(id, '1');
    RETURN 1;
    ELSIF
    (cnt = 150) THEN
    INSERT INTO "users_achievement"
      (id_liked, "id_achievement")
    VALUES(id, '2');
    RETURN 2;
    ELSIF
    (cnt = 1000) THEN
    INSERT INTO "users_achievement"
      (id_liked, "id_achievement")
    VALUES(id, '3');
    RETURN 3;
    ELSE
    RETURN 0;
  END
  IF;
  END;
$like_audit$ language plpgsql;

  -- CREATE FUNCTION achievement_popularity(value_popularity int, id_usr int) RETURNS int AS $popularity_audit$
  --   DECLARE cnt int;
  --   BEGIN
  --         UPDATE "users" SET "popular_score" = "popular_score" + value_popularity WHERE "id_users" = id_usr;
  --         cnt := (SELECT popular_score FROM "users" WHERE "id_users" = id_users LIMIT 1);
  --         IF (cnt >= 500) THEN
  --           INSERT INTO "users_achievement" (id_users, "id_achievement") VALUES(id, '10');
  --           RETURN 1;
  --         ELSIF (cnt >= 501 AND cnt <= 1000) THEN
  --           INSERT INTO "users_achievement" (id_users, "id_achievement") VALUES(id, '11');
  --           RETURN 2;
  --         ELSIF (cnt >= 1001 AND cnt <= 10000) THEN
  --           INSERT INTO "users_achievement" (id_users, "id_achievement") VALUES(id, '12');
  --           RETURN 3;
  --         ELSE
  --           RETURN 0;
  --         END IF;
  --   END;
  -- $popularity_audit$ language plpgsql;

  -- insert --

  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/like1.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/like2.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/like3.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/match1.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/match2.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/match3.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/message1.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/message2.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/message3.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/popularity1.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/popularity2.png');
  INSERT INTO "achievement"
    ("path")
  VALUES('/img/achievement/popularity3.png');

  INSERT INTO "interest"
    ("name_interest")
  VALUES('memes');
  INSERT INTO "interest"
    ("name_interest")
  VALUES('photography');
  INSERT INTO "interest"
    ("name_interest")
  VALUES('javascript');
  INSERT INTO "interest"
    ("name_interest")
  VALUES('helicopter dattaque');
  INSERT INTO "interest"
    ("name_interest")
  VALUES('geek');
  INSERT INTO "interest"
    ("name_interest")
  VALUES('travel');



  -- alter table --
  ALTER TABLE "match" ADD FOREIGN KEY ("id_like") REFERENCES "like" ("id_like");

  ALTER TABLE "visit" ADD FOREIGN KEY ("id_users_visit") REFERENCES "users" ("id_users");

  ALTER TABLE "like" ADD FOREIGN KEY ("id_users_like") REFERENCES "users" ("id_users");
  
  ALTER TABLE "notification" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id_users");

  ALTER TABLE "message" ADD FOREIGN KEY ("id_match") REFERENCES "match" ("id_match");

  ALTER TABLE "facebook_users" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id_users");

  ALTER TABLE "google_users" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id_users");

  ALTER TABLE "block" ADD FOREIGN KEY ("id_users_block") REFERENCES "users" ("id_users");

  ALTER TABLE "report" ADD FOREIGN KEY ("id_users_report") REFERENCES "users" ("id_users");

  ALTER TABLE "history" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id_users");

  ALTER TABLE "users_interest" ADD FOREIGN KEY ("id_interest") REFERENCES "interest" ("id_interest");

  ALTER TABLE "users_interest" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id_users");

  ALTER TABLE "users_achievement" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id_users");

  ALTER TABLE "users_achievement" ADD FOREIGN KEY ("id_achievement") REFERENCES "achievement" ("id_achievement");