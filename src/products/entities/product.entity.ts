import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text',
    unique: true,
  })
  title: string

  @Column({
    type: 'float',
    default: 0,
  })
  price: number

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number

  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[]

  @Column({
    type: 'text',
  })
  gender: string

  @BeforeInsert()
  checkSlugInsertion() {
    if (!this.slug) {
      this.slug = this.title
        .toLocaleLowerCase()
        .replaceAll(' ', '-')
        .replaceAll("'", '')
    }

    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '')

    // @BeforeUpdate()
  }
}
