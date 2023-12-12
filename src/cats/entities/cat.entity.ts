import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cat {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    age: number;

    @DeleteDateColumn({default: null})
    deletedAt: Date;

    @ManyToOne(() => Breed, (breed) => breed.id, {eager: true})
    breed: Breed;
}
