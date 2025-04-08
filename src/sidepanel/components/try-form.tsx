import { Label } from "@/components/ui/label"
// import * as Select from "@radix-ui/react-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/chrome-extension"
import { useMutation, useQuery } from "convex/react"
import { ChevronDown, Upload, UploadCloud } from "lucide-react"
import { useRef, useState } from "react"

export const TryForm = () => {
  // const [selectedModel, setSelectedModel] = useState("")
  const [selectedModelId, setSelectedModelId] = useState<string>("")
  const [image, setImage] = useState<string | null>(null) // Local preview image
  const [imageUrl, setImageUrl] = useState<string | null>(null) // Permanent stored image URL
  const [isUploading, setIsUploading] = useState(false)
  const [prompt, setPrompt] = useState(
    "fashion editorial, posing like a model, grey background"
  )

  const { user } = useUser()

  // Fetch user's models from Convex
  const models = useQuery(api.headshot_models.listUserModels, {
    user_id: user?.id || ""
  })

  // Find the selected model
  const selectedModel = models?.find((model) => model._id === selectedModelId)

  // Mutations for file uploads
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const saveImageReference = useMutation(api.files.saveImageReference)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a local preview immediately
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Convex storage
      await uploadFile(file)
    }
  }

  // Upload file to Convex storage
  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true)

      // Step 1: Get a signed upload URL
      const uploadUrl = await generateUploadUrl()

      // Step 2: Upload the file directly to storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file
      })

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`)
      }

      // Step 3: Get the stored file ID from the response
      const { storageId } = await result.json()

      // Step 4: Save the file reference in the database
      const { url } = await saveImageReference({
        storageId,
        userId: user?.id || ""
      })

      // Update the component state with the permanent URL
      setImageUrl(url)
      setIsUploading(false)
    } catch (error) {
      console.error("Error uploading file:", error)
      setIsUploading(false)
    }
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      // Create a local preview immediately
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Convex storage
      await uploadFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission with the permanent URL
    console.log({
      model: selectedModel,
      image: imageUrl, // Use the permanent URL instead of the data URL
      prompt
    })

    // Here you would call your API to perform the model generation with the image
  }

  return (
    <div className="plasmo-p-4">
      <h2 className="plasmo-text-xl plasmo-font-bold plasmo-mb-4">Try It On</h2>

      <form onSubmit={handleSubmit} className="plasmo-space-y-4">
        {/* Model Selection */}
        <div className="plasmo-space-y-2">
          <div className="plasmo-space-y-2 plasmo-w-full">
            <Label htmlFor="modelSelect" className="">
              Select Model
            </Label>
            <Select
              value={selectedModelId}
              onValueChange={(value) => {
                if (value === "create-new") {
                  // router.push("/train-model")
                  return
                }
                setSelectedModelId(value)
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models
                  ?.filter(
                    (model) => model.status === "finished" && model.lora_id
                  )
                  .map((model) => (
                    <SelectItem key={model._id} value={model._id}>
                      {model.name}
                    </SelectItem>
                  ))}
                <SelectItem value="create-new" className="border-t mt-2 pt-2">
                  + Create new model
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Image Upload Area */}
        <div className="plasmo-space-y-2">
          <label className="plasmo-block plasmo-text-sm plasmo-font-medium">
            Upload Image
          </label>
          <div
            className={`plasmo-border-2 plasmo-border-dashed plasmo-rounded-lg plasmo-p-6 plasmo-text-center plasmo-cursor-pointer ${
              isUploading
                ? "plasmo-border-yellow-500"
                : image
                  ? "plasmo-border-blue-500"
                  : "plasmo-border-gray-300 plasmo-hover:border-gray-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="plasmo-hidden"
            />

            {isUploading ? (
              <div className="plasmo-space-y-2">
                <div className="plasmo-animate-pulse plasmo-flex plasmo-justify-center">
                  <UploadCloud className="plasmo-h-12 plasmo-w-12 plasmo-text-yellow-500" />
                </div>
                <p className="plasmo-text-sm plasmo-font-medium">
                  Uploading...
                </p>
              </div>
            ) : image ? (
              <div className="plasmo-space-y-2">
                <img
                  src={image}
                  alt="Uploaded preview"
                  className="plasmo-max-h-40 plasmo-mx-auto plasmo-rounded"
                />
                <p className="plasmo-text-sm plasmo-text-gray-500">
                  {imageUrl
                    ? "Image uploaded successfully"
                    : "Click or drag to change image"}
                </p>
              </div>
            ) : (
              <div className="plasmo-space-y-2">
                <UploadCloud className="plasmo-mx-auto plasmo-h-12 plasmo-w-12 plasmo-text-gray-400" />
                <p className="plasmo-text-sm plasmo-font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="plasmo-text-xs plasmo-text-gray-500">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Text Area */}
        <div className="plasmo-space-y-2">
          <label
            htmlFor="prompt"
            className="plasmo-block plasmo-text-sm plasmo-font-medium">
            Prompt
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="plasmo-w-full plasmo-px-3 plasmo-py-2 plasmo-border plasmo-border-gray-300 plasmo-rounded-md plasmo-shadow-sm plasmo-focus:outline-none plasmo-focus:ring-2 plasmo-focus:ring-blue-500 plasmo-focus:border-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!imageUrl || !selectedModelId}
          className={`plasmo-w-full plasmo-text-white plasmo-font-medium plasmo-py-2 plasmo-px-4 plasmo-rounded-md plasmo-focus:outline-none plasmo-focus:ring-2 plasmo-focus:ring-blue-500 plasmo-focus:ring-offset-2 ${
            !imageUrl || !selectedModelId
              ? "plasmo-bg-blue-400 plasmo-cursor-not-allowed"
              : "plasmo-bg-blue-600 plasmo-hover:bg-blue-700"
          }`}>
          {isUploading ? "Uploading..." : "Try It On"}
        </button>
      </form>
    </div>
  )
}
