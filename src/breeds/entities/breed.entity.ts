import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"

@Entity()
export class Breed {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
   
    @OneToMany(() => Cat, (cat) => cat.breed)
    cats: Cat[];
}
