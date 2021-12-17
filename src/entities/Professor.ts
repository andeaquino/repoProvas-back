import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Subject from "./Subject";

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

  getTask() {
    return {
      professorId: this.id,
      name: this.name,
      subject: this.subject?.name || ""
    }
  }
}