import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    PrimaryColumn 
} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    
    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    name: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: 'user' })
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
