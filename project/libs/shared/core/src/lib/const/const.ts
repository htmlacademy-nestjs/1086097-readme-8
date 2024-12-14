export const MinLengthCheck = {
  Password: 6,
  Name: 3,
  Title: 20,
  Announcement: 50,
  Text: 100,
  Quote: 20,
  Author: 3,
  Tag: 3,
  CommentText: 10,
} as const;

export const MaxLengthCheck = {
  Password: 12,
  Name: 50,
  Title: 50,
  Announcement: 255,
  Text: 1024,
  Quote: 300,
  Author: 50,
  Tag: 10,
  CommentText: 300,
  Description: 300,
} as const;

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;
