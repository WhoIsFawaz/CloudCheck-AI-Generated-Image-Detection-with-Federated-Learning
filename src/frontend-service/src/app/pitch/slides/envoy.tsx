import { CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Network, Server, Settings, Shield } from "lucide-react";

export default function EnvoySlideUpdatedFormatted() {
  return (
    <CarouselItem>
      <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 md:px-8">
        <ScrollArea className="h-[calc(100vh-4rem)] md:h-auto w-full flex items-center justify-center max-w-6xl py-8">
          <div className="flex flex-col-reverse md:flex-row gap-10 items-center max-w-[100vw]">
            {/* Left Section */}
            <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
              {/* HTTP Filters Configuration */}
              <motion.div
                className="bg-background shadow-md rounded-lg p-4 md:p-6 w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  HTTP Filters Configuration
                </h2>
                <div className="bg-muted rounded-md p-2 md:p-4">
                  <pre className="text-xs md:text-sm whitespace-pre-wrap break-all md:break-normal overflow-x-hidden">
                    <code>{`http_filters:
  - name: envoy.filters.http.grpc_web
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
  - name: envoy.filters.http.cors
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.filters.http.cors.v3.CorsPolicy
  - name: envoy.filters.http.router
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router`}</code>
                  </pre>
                </div>
              </motion.div>

              {/* Service Cluster Configuration */}
              <motion.div
                className="bg-background shadow-md rounded-lg p-4 md:p-6 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  Service Cluster Configuration
                </h2>
                <div className="bg-muted rounded-md p-2 md:p-4">
                  <pre className="text-xs md:text-sm whitespace-pre-wrap break-all md:break-normal overflow-x-hidden">
                    <code>{`- name: federated-learning-envoy-service
  connect_timeout: 1.25s
  type: strict_dns
  lb_policy: round_robin
  load_assignment:
    cluster_name: federated-learning-envoy-service
    endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: federated-learning-service
                port_value: 6002`}</code>
                  </pre>
                </div>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-background rounded-lg p-4 md:p-6 flex flex-col justify-center w-full">
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Title */}
                <div>
                  <h1 className="text-2xl md:text-5xl font-medium">Envoy</h1>
                  <p className="text-base md:text-lg text-muted-foreground mt-2">
                    High-performance proxy for microservices and cloud-native
                    applications.
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-4">
                    <Network className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <h2 className="text-base md:text-lg font-semibold">
                        Gateway & Protocol
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Supports HTTP & gRPC traffic with filters like grpc_web,
                        cors, and router.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <h2 className="text-base md:text-lg font-semibold">
                        CORS Configuration
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Allows all origins (*), supports multiple HTTP methods,
                        with a 20-day max age.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Server className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <h2 className="text-base md:text-lg font-semibold">
                        Load Balancing
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Uses round-robin policy with 4 backend services and
                        1.25s connection timeout.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Settings className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <h2 className="text-base md:text-lg font-semibold">
                        Admin Interface
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Access logs on port 9901 for monitoring and debugging.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </CarouselItem>
  );
}
