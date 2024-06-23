export async function createRefreshToken(userId, token) {
    const newRefreshModel = new RefreshToken({
        user_id: userId,
        token
    });

    const refreshToken = await newRefreshModel.save();

    return refreshToken;
}