import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import apiClient from '../../api/client'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const { setToken } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token') ?? params.get('access_token')
    const isNewUser = params.get('is_new_user')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    setToken(token)

    // 백엔드가 신규 유저 여부를 직접 알려주는 경우
    if (isNewUser === 'true') {
      navigate('/signup/terms', { replace: true })
      return
    }
    if (isNewUser === 'false') {
      navigate('/home', { replace: true })
      return
    }

    // 내 정보 조회로 신규/기존 회원 확인
    apiClient.get('/auth/me')
      .then((response) => {
        if (response.data.onboarding?.onboarding_completed) {
          navigate('/home', { replace: true })
        } else {
          navigate('/signup/terms', { replace: true })
        }
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
  }, [navigate, setToken])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-grey-500">로그인 처리 중...</p>
    </div>
  )
}
