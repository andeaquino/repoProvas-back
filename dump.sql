CREATE TABLE "tests" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"category_id" integer NOT NULL,
	"professor_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"pdf" TEXT NOT NULL,
	CONSTRAINT "tests_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "professors" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"subject_id" integer NOT NULL,
	CONSTRAINT "professors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "subjects" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"period_id" integer NOT NULL,
	CONSTRAINT "subjects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "periods" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "periods_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "tests" ADD CONSTRAINT "tests_fk0" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "tests" ADD CONSTRAINT "tests_fk1" FOREIGN KEY ("professor_id") REFERENCES "professors"("id");
ALTER TABLE "tests" ADD CONSTRAINT "tests_fk2" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");

ALTER TABLE "professors" ADD CONSTRAINT "professors_fk0" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");

ALTER TABLE "subjects" ADD CONSTRAINT "subjects_fk0" FOREIGN KEY ("period_id") REFERENCES "periods"("id");

INSERT INTO categories (name) VALUES ('P1');
INSERT INTO categories (name) VALUES ('P2');
INSERT INTO categories (name) VALUES ('P3');
INSERT INTO categories (name) VALUES ('2ch');
INSERT INTO categories (name) VALUES ('Outras');

INSERT INTO periods (name) VALUES ('1º sem');
INSERT INTO periods (name) VALUES ('2º sem');
INSERT INTO periods (name) VALUES ('3º sem');
INSERT INTO periods (name) VALUES ('4º sem');
INSERT INTO periods (name) VALUES ('5º sem');
INSERT INTO periods (name) VALUES ('6º sem');
INSERT INTO periods (name) VALUES ('7º sem');
INSERT INTO periods (name) VALUES ('8º sem');

INSERT INTO subjects (name, period_id) VALUES ('MA111', 1);
INSERT INTO subjects (name, period_id) VALUES ('MA211', 2);
INSERT INTO subjects (name, period_id) VALUES ('MA311', 3);
INSERT INTO subjects (name, period_id) VALUES ('F 129', 4);
INSERT INTO subjects (name, period_id) VALUES ('F 128', 5);
INSERT INTO subjects (name, period_id) VALUES ('QI244', 6);
INSERT INTO subjects (name, period_id) VALUES ('QG101', 7);
INSERT INTO subjects (name, period_id) VALUES ('MC102', 8);

INSERT INTO professors (name, subject_id) VALUES ('Elizabet Marroquim Carrasqueira', 1);
INSERT INTO professors (name, subject_id) VALUES ('Nina Freiria Chousa', 1);
INSERT INTO professors (name, subject_id) VALUES ('Eliel Clementino Souto', 2);
INSERT INTO professors (name, subject_id) VALUES ('Delfim Nogueira Mexia', 2);
INSERT INTO professors (name, subject_id) VALUES ('Letícia Raminhos Oleiro', 3);
INSERT INTO professors (name, subject_id) VALUES ('Ulisses Belchior Freire', 4);
INSERT INTO professors (name, subject_id) VALUES ('Alessandro Redondo Velasques', 5);
INSERT INTO professors (name, subject_id) VALUES ('Vilma Atilano Nazário', 6);
INSERT INTO professors (name, subject_id) VALUES ('Cristiana Faleiro Dâmaso', 7);
INSERT INTO professors (name, subject_id) VALUES ('Flora Barreno Condorcet', 8);
