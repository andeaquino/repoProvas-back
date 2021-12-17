import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Category from "./Category";
import Professor from "./Professor";
import Subject from "./Subject";

@Entity("tests")
export default class Test {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column()
  professor_id: number;
  
  @Column()
  subject_id: number;
  
  @Column()
  pdf: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id'})
  category: Category;
    
  @OneToOne(() => Professor)
  @JoinColumn({ name: 'professor_id'})
  professor: Professor;
    
  @OneToOne(() => Subject)
  @JoinColumn({ name: 'subject_id'})
  subject: Subject;
    
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