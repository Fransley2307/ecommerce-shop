import { useEffect, useState } from "react";
import { FormattedNumber, IntlProvider } from "react-intl";
import { OrderService } from "../services/order.service";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderStatus } from "../dtos/order.dto";
import { Package, Calendar } from "lucide-react";

export function OrdersPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await OrderService.list();
        setOrders(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar pedidos"
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const getStatusInfo = (status: string) => {
    return (
      OrderStatus.find((s) => s.value === status) || OrderStatus[0]
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        Carregando seus pedidos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-20">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Nenhum pedido realizado</h1>
          <p className="text-gray-600">
            Você ainda não fez nenhuma compra. Comece a explorar nossos produtos!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Meus Pedidos</h1>
      <p className="text-gray-600 mb-6">{orders.length} pedido(s) encontrado(s)</p>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          return (
            <div
              key={order.id}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Número do Pedido</p>
                  <p className="font-semibold">{order.id?.substring(0, 8)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Data</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-semibold">
                      {new Date(order.createdAt || "").toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold text-blue-600">
                    <IntlProvider locale="pt-BR">
                      <FormattedNumber
                        value={order.total}
                        style="currency"
                        currency="BRL"
                      />
                    </IntlProvider>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${statusInfo.bg} ${statusInfo.text}`}
                  >
                    {statusInfo.label}
                  </div>
                </div>
              </div>

              {/* Endereço */}
              {typeof order.customer !== 'string' && order.customer && (
                <div className="bg-gray-50 p-4 rounded text-sm mb-4">
                  <p className="font-semibold mb-2 text-gray-900">Endereço de entrega:</p>
                  <p className="text-gray-700">
                    {order.customer.address}
                  </p>
                  <p className="text-gray-700">
                    {typeof order.customer.city !== 'string' && order.customer.city?.name}, CEP: {order.customer.zipcode}
                  </p>
                </div>
              )}

              {/* Items */}
              {order.items && order.items.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Itens:</p>
                  <ul className="space-y-2">
                    {order.items.map((item, idx) => {
                      const productName = typeof item.product === 'string' 
                        ? 'R$ NaN' 
                        : item.product.name;
                      
                      return (
                        <li key={idx} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded">
                          <span className="text-gray-700">
                            • {item.quantity} x - {productName}
                          </span>
                          <span className="font-semibold text-gray-900">
                            <IntlProvider locale="pt-BR">
                              <FormattedNumber
                                value={item.value}
                                style="currency"
                                currency="BRL"
                              />
                            </IntlProvider>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
