import "./reg.css";
const Reg = () => {
    return (
        <div className="intro">
        <div className="container">
            <div className="login_reg_block">
            
                <div className="logo">GetGether</div>
                <div className="reg_text">Создание аккаунта</div>
                <div className="regin">
                <div className="input-form">
                    <input type="text" placeholder="Ник"/>
                </div>
                <div className="input-form">
                    <input type="email" placeholder="E-mail"/>
                </div>
                <div className="input-form">
                    <input type="text" placeholder="Город"/>
                </div>
                <div className="input-form">
                    <input type="password" placeholder="Пароль"/>
                </div>
                <div className="input-form">
                    <input type="password" placeholder="Повторите пароль"/>
                </div>
                <button>Создать</button>
                </div>
                    <footer className="nav">
                        <a className="nav_link" href="login.html">Уже есть аккаунт</a>
                    </footer>
            
            </div>
        </div>
    </div>
        );
    }
    export default Reg;