"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, CheckCircle, X, FileText, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function VerificationSection() {
  const [isVerified, setIsVerified] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRealMeSubmitting, setIsRealMeSubmitting] = useState(false)

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleVerify = () => {
    setIsSubmitting(true)

    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false)
      setIsVerified(true)
    }, 2000)
  }

  const handleRealMeVerify = () => {
    setIsRealMeSubmitting(true)

    // Simulate RealMe verification process
    setTimeout(() => {
      setIsRealMeSubmitting(false)
      setIsVerified(true)
    }, 1500)
  }

  // Get file icon based on type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (extension === "pdf") {
      return <FileText className="h-4 w-4 text-red-400" />
    } else if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return <FileText className="h-4 w-4 text-blue-400" />
    } else {
      return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  if (isVerified) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center flex-col py-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/20 animate-pulse">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <span className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Verification Complete
          </span>
          <p className="text-gray-300 text-center text-sm max-w-md">Your identity has been verified successfully.</p>
          <Button
            className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            View Waitlist Status
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* RealMe Verification Button - Now positioned above document upload */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-lg p-4 border border-orange-500/20 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium text-white text-sm mb-0.5">Verify with RealMe</h3>
                <p className="text-xs text-gray-400">Quick and secure verification</p>
              </div>
            </div>
            <Button
              className={cn(
                "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg shadow-md shadow-orange-500/20 transition-all duration-300 relative overflow-hidden",
                isRealMeSubmitting && "pointer-events-none",
              )}
              size="sm"
              disabled={isRealMeSubmitting}
              onClick={handleRealMeVerify}
            >
              {isRealMeSubmitting ? (
                <div className="flex items-center px-3 py-0.5">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  <span className="text-xs">Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center px-3 py-0.5">
                  <span className="text-xs">Verify Now</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              )}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center my-4">
          <div className="h-px bg-gray-700/50 w-full"></div>
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-700/50 w-full"></div>
        </div>
      </div>

      {/* Document Upload Section - Now more compact */}
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-white text-sm mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-blue-400" />
            Upload Verification Documents
          </h3>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group",
              isDragging
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-600 hover:border-blue-500/50 hover:bg-blue-500/5",
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileInput} />
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-300">Uploaded documents</p>
              <p className="text-xs text-gray-400">{uploadedFiles.length} file(s)</p>
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm p-2 rounded-md border border-white/5 group hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-2 truncate max-w-[80%]">
                    {getFileIcon(file.name)}
                    <span className="text-xs text-gray-300 truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          className={cn(
            "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg shadow-md shadow-blue-600/20 transition-all duration-300 relative overflow-hidden text-sm",
            isSubmitting && "pointer-events-none",
          )}
          disabled={uploadedFiles.length === 0 || isSubmitting}
          onClick={handleVerify}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Submit Documents
            </>
          )}
        </Button>

        <div className="text-center text-xs text-gray-500 pt-1">
          <p>Your information is encrypted and securely stored.</p>
        </div>
      </div>
    </div>
  )
}

