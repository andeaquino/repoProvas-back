import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Period from "./Period";

@Entity("subjects")
export default class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({ name: 'period_id'})
  periodId: number;

  @OneToOne(() => Period)
  @JoinColumn({ name: 'period_id'})
  period: Period;

  getTask() {
    return {
      subjectId: this.id,
      name: this.name,
      period: this.period?.name || ""
    }
  }
}