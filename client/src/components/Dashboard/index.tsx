import styles from './Dashboard.module.css'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import Blockchain from '../../assets/lotties/blockchain.json';

const Dashboard = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log(values);
    axios.post('http://localhost:8080/register', values)
    .then((res) => {
      console.log(res)
      message.success(res.data)
      navigate(`/account/${values.username}`, {replace: true})
    }).catch((err) => {
      console.log(err)
      message.error("Something went wrong!")
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h1 className={styles.title}>Go-DeFi-Crazy</h1>
      <Player 
        src={Blockchain}
        autoplay
        loop
        className={styles.blockLottie}
      />
      <div className={styles.container}>
        <div className={styles.heroContainer}>
          <section className={styles.introSection}>
            <h3 className={styles.introTitle}>Welcome to Defi-Crazy</h3>
            <h4 className={styles.introText}>
              A Platform where you can create test accounts on the 
              <strong> Stellar network </strong>
              and send, receive payments. Create an account to explore 
              all the amazing stuff!
            </h4>
          </section>
          <section className={styles.regSection}>
            <Form 
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </div>
    </>
  )
}

export default Dashboard