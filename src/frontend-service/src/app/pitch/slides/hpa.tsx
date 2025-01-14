import { CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function KubernetesScaling() {
  return (
    <CarouselItem>
      <div className="h-screen w-full bg-background flex items-center justify-center px-8">
        <div className="max-w-6xl w-full space-y-8">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            {/* Title */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-medium">
                Kubernetes Scaling & HPA Overview
              </h1>
              <p className="text-lg md:text-xl my-4 text-muted-foreground">
                Horizontal pod autoscaling configuration and metrics for
                federated learning, frontend, and global model services.
              </p>
            </motion.div>

            {/* Configuration Details */}
            <motion.div
              className="grid gap-8 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* YAML Configuration */}
              <div className="bg-muted p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-medium mb-4">HPA Configuration</h2>
                <pre className="text-base md:text-lg whitespace-pre-wrap">
                  <code>
                    {`apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: federated-learning-deployment
spec:
  maxReplicas: 5
  minReplicas: 2
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: federated-learning-deployment
  targetCPUUtilizationPercentage: 80`}
                  </code>
                </pre>
              </div>

              {/* Replica and Pod Metrics */}
              <div className="bg-muted p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-medium mb-4">
                  Replica and Pod Metrics
                </h2>
                <pre className="text-base md:text-lg whitespace-pre-wrap">
                  <code>
                    {`NAME                                     READY   STATUS    RESTARTS   AGE
replicaset.apps/federated-learning-deployment   2/2     Running   0          37h
replicaset.apps/frontend-deployment            2/2     Running   0          37h
replicaset.apps/global-model-deployment        2/2     Running   0          37h`}
                  </code>
                </pre>
              </div>
            </motion.div>

            {/* HPA Targets Section */}
            <motion.div
              className="
             p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-medium mb-4">HPA Targets</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">NAME</th>
                      <th className="text-left py-2 px-4">TARGETS</th>
                      <th className="text-left py-2 px-4">MINPODS</th>
                      <th className="text-left py-2 px-4">MAXPODS</th>
                      <th className="text-left py-2 px-4">REPLICAS</th>
                      <th className="text-left py-2 px-4">AGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">
                        horizontalpodautoscaler.autoscaling/federated-learning-deployment
                      </td>
                      <td className="py-2 px-4">cpu&lt;unknown&gt;/80%</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">37h</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">
                        horizontalpodautoscaler.autoscaling/frontend-deployment
                      </td>
                      <td className="py-2 px-4">cpu:0%/80%</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">37h</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        horizontalpodautoscaler.autoscaling/global-model-deployment
                      </td>
                      <td className="py-2 px-4">cpu:&lt;unknown&gt;/80%</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">37h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </ScrollArea>
        </div>
      </div>
    </CarouselItem>
  );
}
