'use client'

import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleLogin() {
    alert(`Login thành công với số điện thoại: ${phone}`)
  }

  function handleRegister() {
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }
    alert(`Đăng ký thành công với số điện thoại: ${phone}`)
  }

  function handleGoogleLogin() {
    alert('Login bằng Google (demo)')
  }

  function handleForgotPassword() {
    alert('Reset mật khẩu (demo)')
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl overflow-hidden mb-20 shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring bg-gray-100"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring bg-gray-100"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring bg-gray-100"
            />
          )}

          {isLogin && (
            <p className="text-right text-sm text-blue-600 cursor-pointer hover:underline" onClick={handleForgotPassword}>
              Quên mật khẩu?
            </p>
          )}

          <button
            onClick={isLogin ? handleLogin : handleRegister}
            className="cursor-pointer w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>

          {/* <button
            onClick={handleGoogleLogin}
            className="w-full py-2 rounded-lg border flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <FaGoogle /> {isLogin ? 'Đăng nhập' : 'Đăng ký'} với Google
          </button> */}
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? 'Đăng ký' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  )
}