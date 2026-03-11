package com.streamvid.user.service.impl;

import com.streamvid.user.dto.UserDTO;
import com.streamvid.user.entity.User;
import com.streamvid.user.mapper.UserMapper;
import com.streamvid.user.repository.UserRepository;
import com.streamvid.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        // Normally hash password here
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
