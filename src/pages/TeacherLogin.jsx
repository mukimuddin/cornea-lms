import LoginForm from '../components/LoginForm';

function TeacherLogin() {
  const credentials = { username: 'teacher', password: 'teacherpassword' };
  return <LoginForm role="Teacher" credentials={credentials} redirectPath="/teacher-dashboard" />;
}

export default TeacherLogin;
