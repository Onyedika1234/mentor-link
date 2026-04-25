export const mentorProfileDto = (body) => {
  return {
    name: body.user.name,
    email: body.user.email,
    bio: body.bio,
    expertise: body.expertise,
  };
};
