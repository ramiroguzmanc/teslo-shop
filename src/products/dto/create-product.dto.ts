import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  slug?: string

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number

  @IsString({ each: true })
  @IsArray()
  @IsIn(['XS', 'S', 'M', 'L', 'XL'], { each: true })
  sizes: string[]

  @IsString()
  @IsIn(['men', 'women', 'unisex', 'kid'])
  gender: string
}
