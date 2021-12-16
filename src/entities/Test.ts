import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Category from "./Category";
import Professor from "./Professor";
import Subject from "./Subject";

@Entity("subjects")
export default class Test {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id'})
  category: Category;
    
  @OneToOne(() => Professor)
  @JoinColumn({ name: 'professor_id'})
  professor: Professor;
    
  @OneToOne(() => Subject)
  @JoinColumn({ name: 'subject_id'})
  subject: Subject;
    
  @Column()
  pdf: string;

  getTask() {
    return {
      testId: this.id,
      name: this.name,
      category: this.category?.name || "",
      professor: this.professor?.name || "",
      subject: this.subject?.name || "",
      pdf: this.pdf
    }
  }
}