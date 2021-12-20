import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Period from "./Period";
import Test from "./Test";

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

  @OneToMany(() => Test, test => test.professor)
  test: Test[];

  getTask() {
    return {
      subjectId: this.id,
      name: this.name,
      period: this.period?.name || ""
    }
  }
}