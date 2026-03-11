package com.streamvid.user.service;

import com.streamvid.user.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(String id);
    UserDTO getUserByEmail(String email);
    void deleteUser(String id);
}
