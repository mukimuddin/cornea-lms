import LoginForm from '../components/LoginForm';

function StudentLogin() {
  const credentials = { username: 'student', password: 'studentpassword' };
  return <LoginForm role="Student" credentials={credentials} redirectPath="/student-dashboard/profile" />;
}

export default StudentLogin;
