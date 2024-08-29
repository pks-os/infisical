import { useState } from "react";
import { faAws } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

import { Modal, ModalContent } from "@app/components/v2";
import { DynamicSecretProviders } from "@app/hooks/api/dynamicSecret/types";

import { AwsElastiCacheInputForm } from "./AwsElastiCacheInputForm";
import { AwsIamInputForm } from "./AwsIamInputForm";
import { CassandraInputForm } from "./CassandraInputForm";
import { RedisInputForm } from "./RedisInputForm";
import { SqlDatabaseInputForm } from "./SqlDatabaseInputForm";

type Props = {
  isOpen?: boolean;
  onToggle: (isOpen: boolean) => void;
  projectSlug: string;
  environment: string;
  secretPath: string;
};

enum WizardSteps {
  SelectProvider = "select-provider",
  ProviderInputs = "provider-inputs"
}

const DYNAMIC_SECRET_LIST = [
  {
    icon: faDatabase,
    provider: DynamicSecretProviders.SqlDatabase,
    title: "SQL\nDatabase"
  },
  {
    icon: faDatabase,
    provider: DynamicSecretProviders.Cassandra,
    title: "Cassandra"
  },
  {
    icon: faDatabase,
    provider: DynamicSecretProviders.Redis,
    title: "Redis"
  },
  {
    icon: faAws,
    provider: DynamicSecretProviders.AwsElastiCache,
    title: "AWS ElastiCache"
  },
  {
    icon: faAws,
    provider: DynamicSecretProviders.AwsIam,
    title: "AWS IAM"
  }
];

export const CreateDynamicSecretForm = ({
  isOpen,
  onToggle,
  projectSlug,
  environment,
  secretPath
}: Props) => {
  const [wizardStep, setWizardStep] = useState(WizardSteps.SelectProvider);
  const [selectedProvider, setSelectedProvider] = useState<DynamicSecretProviders | null>(null);

  const handleFormReset = (state: boolean = false) => {
    onToggle(state);
    setWizardStep(WizardSteps.SelectProvider);
    setSelectedProvider(null);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(state) => handleFormReset(state)}>
      <ModalContent
        title="Dynamic secret setup"
        subTitle="Configure dynamic secret parameters"
        className="my-4 max-w-3xl"
      >
        <AnimatePresence exitBeforeEnter>
          {wizardStep === WizardSteps.SelectProvider && (
            <motion.div
              key="select-type-step"
              transition={{ duration: 0.1 }}
              initial={{ opacity: 0, translateX: 30 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -30 }}
            >
              <div className="mb-4 text-mineshaft-300">Select a service to connect to:</div>
              <div className="flex items-center space-x-4">
                {DYNAMIC_SECRET_LIST.map(({ icon, provider, title }) => (
                  <div
                    key={`dynamic-secret-provider-${provider}`}
                    className="flex h-32 w-32 cursor-pointer flex-col items-center space-y-4 rounded border border-mineshaft-500 bg-bunker-600 p-6 transition-all hover:border-primary/70 hover:bg-primary/10 hover:text-white"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedProvider(provider);
                      setWizardStep(WizardSteps.ProviderInputs);
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setSelectedProvider(provider);
                        setWizardStep(WizardSteps.ProviderInputs);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={icon} size="lg" />
                    <div className="whitespace-pre-wrap text-center text-sm">{title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {wizardStep === WizardSteps.ProviderInputs &&
            selectedProvider === DynamicSecretProviders.SqlDatabase && (
              <motion.div
                key="dynamic-sql-step"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0, translateX: 30 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -30 }}
              >
                <SqlDatabaseInputForm
                  onCompleted={handleFormReset}
                  onCancel={handleFormReset}
                  projectSlug={projectSlug}
                  secretPath={secretPath}
                  environment={environment}
                />
              </motion.div>
            )}
          {wizardStep === WizardSteps.ProviderInputs &&
            selectedProvider === DynamicSecretProviders.Redis && (
              <motion.div
                key="dynamic-redis-step"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0, translateX: 30 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -30 }}
              >
                <RedisInputForm
                  onCompleted={handleFormReset}
                  onCancel={handleFormReset}
                  projectSlug={projectSlug}
                  secretPath={secretPath}
                  environment={environment}
                />
              </motion.div>
            )}
          {wizardStep === WizardSteps.ProviderInputs &&
            selectedProvider === DynamicSecretProviders.AwsElastiCache && (
              <motion.div
                key="dynamic-aws-elasticache-step"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0, translateX: 30 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -30 }}
              >
                <AwsElastiCacheInputForm
                  onCompleted={handleFormReset}
                  onCancel={handleFormReset}
                  projectSlug={projectSlug}
                  secretPath={secretPath}
                  environment={environment}
                />
              </motion.div>
            )}
          {wizardStep === WizardSteps.ProviderInputs &&
            selectedProvider === DynamicSecretProviders.Cassandra && (
              <motion.div
                key="dynamic-cassandra-step"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0, translateX: 30 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -30 }}
              >
                <CassandraInputForm
                  onCompleted={handleFormReset}
                  onCancel={handleFormReset}
                  projectSlug={projectSlug}
                  secretPath={secretPath}
                  environment={environment}
                />
              </motion.div>
            )}
          {wizardStep === WizardSteps.ProviderInputs &&
            selectedProvider === DynamicSecretProviders.AwsIam && (
              <motion.div
                key="dynamic-aws-iam-step"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0, translateX: 30 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -30 }}
              >
                <AwsIamInputForm
                  onCompleted={handleFormReset}
                  onCancel={handleFormReset}
                  projectSlug={projectSlug}
                  secretPath={secretPath}
                  environment={environment}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
};
