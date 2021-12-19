import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Subject from "./Subject";
import Test from "./Test";

@Entity("professors")
export default class Professor {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({name: 'subject_id'})
  subjectId: number;

  @OneToOne(() => Subject)
  @JoinColumn({ name: 'subject_id'})
  subject: Subject;

  @OneToMany(() => Test, test => test.professor)
  test: Test[];

  getTask() {
    return {
      professorId: this.id,
      name: this.name,
      subject: this.subject?.name || ""
    }
  }
}