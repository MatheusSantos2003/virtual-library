import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("book")
export class BookEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  title: string;


  @Column()
  genre: string;

  @Column()
  release_date: Date
  // add roles


}
