import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWTSECERT } from '../config';

export async function createUserService(name: string, email: string, password: string) {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error('User already exists');
	}
	const user = await User.create({ name, email, password });
  
	const payload = {
		user: {
			id: user.id
		}
	};
	
	const token = jwt.sign(payload, JWTSECERT, { expiresIn:process.env.EXPIRE_TIME });
	return token;
}

export async function loginUserService(email,password) {
	const user=await User.findOne({email}).select('email password');
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if(!isPasswordValid){
		throw new Error('Invalid password');
	}
	const payload = {
		user: {
			id: user.id
		}
	};


	const token = jwt.sign(payload, JWTSECERT, { expiresIn:process.env.EXPIRE_TIME});
	return token;
}