import User from '../models/User';

export async function getAllUsersService() {
	const users = await User.find();
	return users;
}

export async function getUserByIdService(userId: string) {
	const user = await User.findById(userId).select('-password');
	return user;
}