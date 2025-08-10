import { IsEmail, IsNotEmpty, IsString, MinLength, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordMatching', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
  validate(passwordConfirm: string, args: ValidationArguments) {
    const object = args.object as RegisterDto;
    return object.password === passwordConfirm;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Parolalar eşleşmiyor.';
  }
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Ad alanı boş bırakılamaz.' })
  firstName: string; 

  @IsString()
  @IsNotEmpty({ message: 'Soyad alanı boş bırakılamaz.' })
  lastName: string;

  @IsEmail({}, { message: 'Geçerli bir e-posta adresi girin.' })
  @IsNotEmpty({ message: 'E-posta alanı boş bırakılamaz.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Parola en az 6 karakter olmalıdır.' })
  password: string;

  @IsString()
  @Validate(IsPasswordMatchingConstraint, {
    message: 'Parolalar eşleşmiyor.',
  })
  passwordConfirm: string;
}