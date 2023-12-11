import { Column, DeleteDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cat {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;

    @DeleteDateColumn({default: null})
    deletedAt: Date;
}
