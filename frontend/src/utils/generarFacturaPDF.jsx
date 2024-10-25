import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importación del complemento
import { traerCookie } from '../hooks/Cookies';

const generarFacturaPDF = (productos, precioTotal) => {
    const doc = new jsPDF();

    // Obtener información del usuario desde las cookies
    const usuarioEmail = traerCookie('email');
    const usuarioName = traerCookie('username');
    const fechaCompra = new Date().toLocaleDateString();

    // Título de la factura
    doc.setFontSize(20);
    doc.text('Factura de Compra', 20, 20);

    // Información del usuario
    doc.setFontSize(12);
    doc.text(`Nombre: ${usuarioName}`, 20, 30);
    doc.text(`Email: ${usuarioEmail}`, 20, 40);
    doc.text(`Fecha de compra: ${fechaCompra}`, 20, 50);

    // Encabezados de la tabla
    const columnas = [
        { header: 'Producto', dataKey: 'nombre' },
        { header: 'Precio', dataKey: 'precio' },
        { header: 'Cantidad', dataKey: 'cantidad' },
        { header: 'Total', dataKey: 'total' },
        { header: 'Tienda', dataKey: 'tienda' },
    ];

    // Datos de la tabla de productos
    const filas = productos.map((producto) => ({
        nombre: producto.nombre,
        precio: `₡${producto.precio.toFixed(2)}`,
        cantidad: producto.cantidad,
        total: `₡${(producto.precio * producto.cantidad).toFixed(2)}`,
        tienda: producto.tienda, // Asegúrate de que cada producto tenga este campo
    }));

    // Agregar la tabla de productos al PDF
    doc.autoTable({
        head: [columnas.map((col) => col.header)],
        body: filas.map((fila) => columnas.map((col) => fila[col.dataKey])),
        startY: 70,
    });

    // Total de la compra
    doc.setFontSize(14);
    doc.text(`Total de la compra: ₡${precioTotal.toFixed(2)}`, 20, doc.previousAutoTable.finalY + 10);

    // Descargar PDF
    doc.save(`Factura_${fechaCompra}.pdf`);
};

export default generarFacturaPDF;
