import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;
}
