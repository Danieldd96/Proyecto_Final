import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/FormularioPago.css';

const FormularioPago = ({ total, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Simulamos el éxito del pago
            setSuccess(true);
            setLoading(false);

            // Ejecutamos la función onSuccess pasada por props
            onSuccess();
        }
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2 className="payment-form-title">Formulario de Pago</h2>
                <p>Total a pagar: ₡{total}</p>

                <div className="card-element-container">
                    <CardElement className="card-element" />
                </div>

                {error && <div className="payment-error">{error}</div>}
                {success && <div className="payment-success">Pago exitoso</div>}

                <button
                    className="submit-payment"
                    type="submit"
                    disabled={!stripe || loading}
                >
                    {loading ? 'Procesando...' : 'Pagar Ahora'}
                </button>
            </form>
        </div>
    );
};

export default FormularioPago;
