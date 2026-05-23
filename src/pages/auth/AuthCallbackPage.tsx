import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const { setToken } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token') ?? params.get('access_token')

    if (token) {
      setToken(token)
      navigate('/home', { replace: true })
    } else {
      // 토큰이 없으면 로그인으로
      navigate('/login', { replace: true })
    }
  }, [navigate, setToken])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-grey-500">로그인 처리 중...</p>
    </div>
  )
}
